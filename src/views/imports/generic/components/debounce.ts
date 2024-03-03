import { ref, watch, type Ref } from "vue";

export function useDebouncedValue<T>(val: Ref<T>, time = 300) {
  const item = ref<T>();
  let timeoutId: number | null = null;

  watch([val], () => {
    if (timeoutId !== null) clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      item.value = val.value;
    }, time);
  });

  return item;
}

export function useDebouncedWithValue<T>(v: T, time = 300) {
  const val = ref<T>(v);
  const item = ref<T>();
  let timeoutId: number | null = null;

  watch([val], () => {
    if (timeoutId !== null) clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      item.value = val.value as T;
    }, time);
  });

  return [val, item];
}
