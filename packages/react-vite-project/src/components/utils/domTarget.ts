import type { MutableRefObject } from 'react';
import { isFunction } from '.';

type TargetType = HTMLElement | Element | Window | Document;
type TargetValue<T> = T | null | undefined;

export type InputValue<T extends TargetType> =
  | TargetValue<T>
  | (() => TargetValue<T>)
  | MutableRefObject<T>;

export function getTargetElement<T extends TargetType>(
  value: InputValue<T>,
  defaultElement?: T
) {
  if (!value) return defaultElement;

  let targetElement: TargetValue<T>;
  if (isFunction(value)) {
    targetElement = (value as () => TargetValue<T>)();
  } else if ('current' in value) {
    targetElement = value.current;
  } else {
    targetElement = value as TargetValue<T>;
  }
  return targetElement;
}
