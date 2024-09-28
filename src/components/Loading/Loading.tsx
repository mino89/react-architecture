import { observer } from "mobx-react";
import { LoadingProps } from "./types";
import { LoadingService } from "../../core/services/loading-service";
import { useService } from "../../core/hooks/useService";

export const Loading: React.FC<LoadingProps> = observer((LoadingProps) => {
  const { loadingState, loadedState, loadingKey } = LoadingProps;
  const loadingService = useService<LoadingService>("LoadingService");
  return (
    <>
      {loadingService.isLoading.loadingKey === loadingKey &&
      loadingService.isLoading.state ? (
        <div>
          <>{loadingState}</>
        </div>
      ) : (
        <>{loadedState}</>
      )}
    </>
  );
});
