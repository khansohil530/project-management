import React from "react";
import { createPortal } from "react-dom";
import Button from "./Button";

const Modal = React.forwardRef(function Modal(
    { children, buttonCaption },
    ref
) {
    const dialog = React.useRef();
    React.useImperativeHandle(ref, () => ({
        open() {
            dialog.current.showModal();
        },
    }));
    return createPortal(
        <dialog
            ref={dialog}
            className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md"
        >
            {children}
            <form method="dialog" className="mt-4 text-right">
                <Button>{buttonCaption}</Button>
            </form>
        </dialog>,
        document.getElementById("modal-root")
    );
});

export default Modal;
