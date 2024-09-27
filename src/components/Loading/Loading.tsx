import { observer } from "mobx-react";
import { LoadingProps } from "./types";
import { LoadingService } from "../../core/service/loading-service";
import { useService } from "../../core/hooks/useService";




export const Loading: React.FC<LoadingProps> = observer((LoadingProps) => {
  const { loadingState, loadedState } = LoadingProps;
  const loadingStore = useService<LoadingService>("LoadingService");
  return (
    <>
      {loadingStore.isLoading ? (
        <div>
          <>{loadingState}</>
        </div>
      ) : (
        <>{loadedState}</>
      )}
    </>
  );
});
