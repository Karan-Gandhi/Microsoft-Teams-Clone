import { useEffect } from "react";
import useTimeout from "./useTimeout";

export default function useDebounce(callback: () => any, delay: number, dependencies: React.DependencyList) {
	const { reset, clear } = useTimeout(callback, delay);
	useEffect(reset, [...dependencies, reset]);
	useEffect(clear, [clear]);
}
