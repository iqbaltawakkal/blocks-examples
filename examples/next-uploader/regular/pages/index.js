import * as LR from "@uploadcare/blocks";

LR.registerBlocks(LR);

export default function App() {
  return (
    <div className="App">
      <lr-config
        ctx-name="my-uploader"
        pubkey="2b7f257e8ea0817ba746"
        source-list="local, url, camera, dropbox"
      ></lr-config>
      <lr-file-uploader-regular
        css-src="https://cdn.jsdelivr.net/npm/@uploadcare/blocks@0.30.0/web/lr-file-uploader-regular.min.css"
        ctx-name="my-uploader"
        class="my-config"
      ></lr-file-uploader-regular>
    </div>
  );
}
