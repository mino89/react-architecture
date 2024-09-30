import { observer } from "mobx-react";
import { LoadingProps } from "./_types";
import { LoadingService } from "../../core/services/loading-service";
import { useService } from "../../core/hooks/useService";

export const Loading: React.FC<LoadingProps> = observer((LoadingProps) => {
  const { loadingState, loadedState, loadingKey } = LoadingProps;
  const loadingService = useService(LoadingService);
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
