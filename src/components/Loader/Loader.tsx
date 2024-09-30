import { observer } from "mobx-react";
import { LoadingService } from "../../core/services/loading-service";
import { useService } from "../../core/hooks/useService";

export type LoaderProps = {
  loadingState: React.ReactNode;
  loadedState: React.ReactNode;
  loadingKey: string;
  isLoading: boolean;
};

export const Loader: React.FC<LoaderProps> = observer((LoadingProps) => {
  const { loadingState, loadedState, loadingKey } = LoadingProps;
  const loadingService = useService(LoadingService);
  return (
    <>
      {loadingService.isLoading.loadingKey === loadingKey &&
      loadingService.isLoading.state
        ? loadingState
        : loadedState}
    </>
  );
});
