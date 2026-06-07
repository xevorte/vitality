import { defineConfig } from 'orval';
import path from 'path';

const BASE_SERVICE_CONFIG_HOOKS = {
  afterAllFilesWrite: 'yarn lint --fix src/api',
};

export default defineConfig({
  service: {
    input: { target: './src/assets/api.json' },
    output: {
      mode: 'tags-split',
      override: {
        mutator: {
          path: './src/api/utils/vitality-service-request.ts',
          name: 'vitalityServiceRequest',
          alias: {
            utils: path.resolve(__dirname, './src/utils'),
          },
        },
      },
      schemas: 'src/api/generated/models/vitality',
      target: 'src/api/generated/services/vitality',
      mock: false,
    },
    hooks: {
      ...BASE_SERVICE_CONFIG_HOOKS,
    },
  },
});
