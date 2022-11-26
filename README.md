# react-hooks-clone

このリポジトリは、`useState`などの React Hooks のクローンを実装することを目的としています。
実装に関するより詳細な情報は[Qiita](https://qiita.com/stringthread/items/3806f9c43d434036de01)にて掲載しています。

In this repository, I tried to implement the clones for React Hooks ( such as `useState` ).
Further information about the code is described in [Qiita](https://qiita.com/stringthread/items/3806f9c43d434036de01) (Japanese).

## Usage

このリポジトリの実行には`npm`が必要です。予めインストールの上、`npm install`コマンドで必要なライブラリを入手してください。
サンプルの実行は`npm run dev`コマンドで行えます。その際、自動的にブラウザが立ち上がり`src/sample/index.tsx`をエントリポイントとして実行が開始されます。

You need `npm` to run the program in this repository. Installing it beforehand, and you can install the libraries that this program need with `npm install` command.
You can run the sample program with `npm run dev` command. Once you executed the command, a browser will automatically start and execution will start with the entry point `src/sample/index.tsx`.

## Contribution

このリポジトリは個人の学習用に実装したものであり、機能拡張やデバッグ等のメンテナンスを行う予定はありません。
ただし、機能拡張やデバッグを行った場合は、プルリクエストを受け付けます。プルリクエストを送信する場合、適切な動作確認を行った後に行ってください。
また、Hooks の新規追加や機能拡張の場合は、`src/sample`以下のファイルを編集して、動作が分かる適切なサンプルを必ず作成してください。（`src/sample/index.tsx`から確認できるようにしてください）

This repository is created only for individual studying, so I won't update it ( e.g. feature enhancement or debugging).
However, if you updated this repository, I accept your pull requests. When you send a pull request, please check the operation properly before sending.
In addition, you should create a sample to show new feature by editing files in `src/sample`, in case of new hook addition or other feature enhancement. ( The sample must be checked via `src/sample/index.tsx`. )
