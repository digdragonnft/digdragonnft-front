import BaseLayoutV2 from "./Layout/BaseLayoutV2";

export default function LoadingScreen() {
  return (
    <BaseLayoutV2>
      <div className="flex min-h-screen w-full items-center justify-center">
        <div className="loading loading-spinner text-white"></div>
      </div>
    </BaseLayoutV2>
  );
}
