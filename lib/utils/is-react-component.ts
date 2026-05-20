import type React from "react";

type ReactComponent = React.ComponentType | React.ForwardRefExoticComponent<unknown>;

/**
 * Checks if a given value is a function component.
 */
export const isFunctionComponent = (
  component: unknown,
): component is React.FC => {
  return typeof component === "function";
};

/**
 * Checks if a given value is a class component.
 */
export const isClassComponent = (
  component: unknown,
): component is React.ComponentClass => {
  return (
    typeof component === "function" &&
    component.prototype &&
    (!!(component.prototype as Record<string, unknown>).isReactComponent || 
     !!(component.prototype as Record<string, unknown>).render)
  );
};

/**
 * Checks if a given value is a forward ref component.
 */
export const isForwardRefComponent = (
  component: unknown,
): component is React.ForwardRefExoticComponent<unknown> => {
  const comp = component as { $$typeof?: { toString(): string } } | null;
  return (
    typeof comp === "object" &&
    comp !== null &&
    comp.$$typeof?.toString() === "Symbol(react.forward_ref)"
  );
};

/**
 * Checks if a given value is a valid React component.
 */
export const isReactComponent = (
  component: unknown,
): component is ReactComponent => {
  return (
    isFunctionComponent(component) ||
    isForwardRefComponent(component) ||
    isClassComponent(component)
  );
};
