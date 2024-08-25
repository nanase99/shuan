import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../app/components/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {
      // NOTE:
      // remixがpluginsに指定されている設定ファイルを指定するとStorybookが起動できない
      // 別ファイルを用意し、読み込むことで解消する
      builder: {
        viteConfigPath: "sb-vite.config.ts",
      },
    },
  },
};
export default config;
