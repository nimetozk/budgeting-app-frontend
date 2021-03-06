/**
 *
 * To understand the implementation and usage of the useContect and useRef,
 * I have followed the documentation on:
 * https://reactjs.org/docs/context.html
 *
 * and I have taken the course on:
 * https://scrimba.com/learn/reacthooks
 */

import * as React from "react";
import { ConfirmationDialog } from "./confirmation-dialog";

/*
const ConfirmationOptions ={
    title :'',
    description:'',
    open:false,
    onSubmit: () => {},
    onClose:  () => {}
}
*/

const ConfirmationServiceContext = React.createContext(Promise.reject);
export const useConfirmation = () =>
  React.useContext(ConfirmationServiceContext);

export const ConfirmationServiceProvider = ({ children }) => {
  const [confirmationState, setConfirmationState] = React.useState(null);
  const awaitingPromiseRef = React.useRef({
    resolve: () => {},
    reject: () => {},
  });

  const openConfirmation = (confirmationOptions) => {
    setConfirmationState(confirmationOptions);
    return new Promise((resolve, reject) => {
      awaitingPromiseRef.current = { resolve, reject };
    });
  };

  const handleClose = () => {
    if (awaitingPromiseRef.current) {
      awaitingPromiseRef.current.reject();
    }

    setConfirmationState(null);
  };

  const handleSubmit = () => {
    if (awaitingPromiseRef.current) {
      awaitingPromiseRef.current.resolve();
    }

    setConfirmationState(null);
  };

  return (
    <>
      <ConfirmationServiceContext.Provider
        value={openConfirmation}
        children={children}
      />

      <ConfirmationDialog
        open={Boolean(confirmationState)}
        onSubmit={handleSubmit}
        onClose={handleClose}
        {...confirmationState}
      />
    </>
  );
};
