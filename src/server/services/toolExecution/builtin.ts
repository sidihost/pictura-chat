import { type LobeChatDatabase } from '@lobechat/database';
import { type ChatToolPayload } from '@lobechat/types';
import { safeParseJSON } from '@lobechat/utils';
import debug from 'debug';

import { KlavisService } from '@/server/services/klavis';
import { MarketService } from '@/server/services/market';

import { getServerRuntime, hasServerRuntime } from './serverRuntimes';
import { type IToolExecutor, type ToolExecutionContext, type ToolExecutionResult } from './types';

const log = debug('lobe-server:builtin-tools-executor');

export class BuiltinToolsExecutor implements IToolExecutor {
  private marketService: MarketService;
  private klavisService: KlavisService;

  constructor(db: LobeChatDatabase, userId: string) {
    this.marketService = new MarketService({ userInfo: { userId } });
    this.klavisService = new KlavisService({ db, userId });
  }

  async execute(
    payload: ChatToolPayload,
    context: ToolExecutionContext,
  ): Promise<ToolExecutionResult> {
    const { identifier, apiName, arguments: argsStr, source } = payload;
    const args = safeParseJSON(argsStr) || {};

    log(
      'Executing builtin tool: %s:%s (source: %s) with args: %O',
      identifier,
      apiName,
      source,
      args,
    );

    // Route LobeHub Skills to MarketService
    // Disabled for self-hosted Pictura AI - requires LobeHub marketplace connection
    if (source === 'lobehubSkill') {
      return {
        content: 'This skill requires LobeHub marketplace connection which is not available in self-hosted Pictura AI. Please use local skills instead.',
        error: { code: 'LOBEHUB_SKILL_DISABLED', message: 'LobeHub skills are disabled in self-hosted mode' },
        success: false,
      };
    }

    // Route Klavis tools to KlavisService
    if (source === 'klavis') {
      return this.klavisService.executeKlavisTool({
        args,
        identifier,
        toolName: apiName,
      });
    }

    // Use server runtime registry (handles both pre-instantiated and per-request runtimes)
    if (!hasServerRuntime(identifier)) {
      throw new Error(`Builtin tool "${identifier}" is not implemented`);
    }

    // Await runtime in case factory is async
    const runtime = await getServerRuntime(identifier, context);

    if (!runtime[apiName]) {
      throw new Error(`Builtin tool ${identifier}'s ${apiName} is not implemented`);
    }

    try {
      return await runtime[apiName](args, context);
    } catch (e) {
      const error = e as Error;
      console.error('Error executing builtin tool %s:%s: %O', identifier, apiName, error);

      return { content: error.message, error, success: false };
    }
  }
}
