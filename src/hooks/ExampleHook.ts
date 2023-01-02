const useExampleHook = () => {
  const loadExample = () => {
    alert('Example loaded successfully');
  };

  return { loadExample };
};

export default useExampleHook;
