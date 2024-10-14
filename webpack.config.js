import path from "path";
import CopyWebpackPlugin from "copy-webpack-plugin";

export default {
  entry: "./src/app.js", // ponto de entrada da sua aplicação
  output: {
    filename: "bundle.js", // nome do arquivo de saída
    path: path.resolve(process.cwd(), "dist"), // pasta de saída
  },
  module: {
    rules: [
      {
        test: /\.js$/, // aplica a regra a arquivos .js
        exclude: /node_modules/, // exclui a pasta node_modules
        use: {
          loader: "babel-loader", // usa o Babel para transpilar JavaScript moderno
        },
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "node_modules/swagger-ui-dist/favicon-32x32.png", to: "api-docs/", toType: "dir" },
        { from: "node_modules/swagger-ui-dist/favicon-16x16.png", to: "api-docs/", toType: "dir" },
        { from: "node_modules/swagger-ui-dist/swagger-ui.css", to: "api-docs/", toType: "dir" },
        {
          from: "node_modules/swagger-ui-dist/swagger-ui-bundle.js",
          to: "api-docs/",
          toType: "dir",
        },
        {
          from: "node_modules/swagger-ui-dist/swagger-ui-standalone-preset.js",
          to: "api-docs/",
          toType: "dir",
        },
      ],
    }),
  ],
  devtool: "source-map", // gera um arquivo de mapa de origem
  mode: "development", // ou 'production' para otimizações de produção
};
