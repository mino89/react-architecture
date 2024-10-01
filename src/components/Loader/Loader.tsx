import { observer } from "mobx-react";
import { LoadingService } from "../../core/services/loading-service";
import { useService } from "../../core/hooks/useService";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { useEffect, useRef, useState } from "react";

export type LoaderProps = {
  loadingState: React.ReactNode;
  loadedState: React.ReactNode;
  loadingKey: string;
};

export const Loader: React.FC<LoaderProps> = observer((LoadingProps) => {
  const { loadingState, loadedState, loadingKey } = LoadingProps;
  const loadingService = useService(LoadingService).isLoading;
  const [loadControl, setLoadControl] = useState(true);
  const loadingRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef<HTMLDivElement>(null);
  const switchLoadState =
    loadingService.loadingKey === loadingKey && loadingService.state;
  useEffect(() => {
    setLoadControl(switchLoadState);
  }, [switchLoadState]);
  const nodeRef = loadControl ? loadingRef : loadedRef;
  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        key={loadControl ? "loadingState" : "loadedState"}
        nodeRef={nodeRef}
        classNames="fade"
        timeout={300}
        addEndListener={(done) => {
          nodeRef.current?.addEventListener("transitionend", done, false);
        }}
        children={
          loadControl ? (
            <div ref={loadingRef}>{loadingState}</div>
          ) : (
            <div ref={loadedRef}>{loadedState}</div>
          )
        }
      />
    </SwitchTransition>
  );
});
