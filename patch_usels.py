import re
with open('src/components/ManagementPortal.jsx', 'r') as f:
    content = f.read()

new_use_local_storage = """
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue instanceof Function ? initialValue() : initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null && item !== 'undefined' && item !== 'null') {
        return JSON.parse(item);
      }
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
    }
    return initialValue instanceof Function ? initialValue() : initialValue;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleStorageChange = (e) => {
      try {
        const item = window.localStorage.getItem(key);
        if (item === null || item === 'undefined' || item === 'null') {
          setStoredValue(initialValue instanceof Function ? initialValue() : initialValue);
        } else {
          setStoredValue(JSON.parse(item));
        }
      } catch (error) {
        console.warn(`Error parsing localStorage key "${key}":`, error);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('ain_user_changed', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('ain_user_changed', handleStorageChange);
    };
  }, [key, initialValue]);

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        if (valueToStore === null || valueToStore === undefined) {
           window.localStorage.removeItem(key);
        } else {
           window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
        if (key === "ain_currentUser") window.dispatchEvent(new Event("ain_user_changed"));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}
"""

content = re.sub(
    r'function useLocalStorage\(key, initialValue\) \{.*?return \[storedValue, setValue\];\n\}',
    new_use_local_storage.strip(),
    content,
    flags=re.DOTALL
)

with open('src/components/ManagementPortal.jsx', 'w') as f:
    f.write(content)
