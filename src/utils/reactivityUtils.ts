import { reactive, ref, Ref } from "vue";

/**
 * Creates a ref from a raw object and casts to the
 * correct type. Prevents any type "unravelling" that Vue
 * might be doing.
 *
 * @param raw Raw object to create ref from
 * @returns ref of the raw object
 */
export function refNoUnwrap<T>(raw: object): Ref<T> {
  return ref(raw) as Ref<T>;
}

/**
 * Creates a reactive object from a raw object and casts
 * to the correct type. Prevents any type "unravelling"
 * that Vue might be doing.
 *
 * @param raw Raw object to create reactive object from
 * @returns reactive object
 */
export function reactiveNoUnwrap<T>(raw: object): T {
  return reactive(raw) as T;
}
