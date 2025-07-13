import { useState, useEffect, useRef } from "react";

interface UseTypewriterEffectOptions {
  text: string;
  speed?: number;
  enabled?: boolean;
}

export function useTypewriterEffect({
  text,
  speed = 30,
  enabled = true,
}: UseTypewriterEffectOptions) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const indexRef = useRef(0);

  useEffect(() => {
    if (!enabled || !text) {
      setDisplayedText(text);
      setIsTyping(false);
      return;
    }

    // Reset if text changed
    if (indexRef.current > text.length) {
      indexRef.current = 0;
      setDisplayedText("");
    }

    setIsTyping(true);

    const typeNextChar = () => {
      if (indexRef.current < text.length) {
        setDisplayedText(text.slice(0, indexRef.current + 1));
        indexRef.current++;
        timeoutRef.current = setTimeout(typeNextChar, speed);
      } else {
        setIsTyping(false);
      }
    };

    // Start typing if we haven't finished yet
    if (indexRef.current < text.length) {
      typeNextChar();
    } else {
      setDisplayedText(text);
      setIsTyping(false);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, speed, enabled]);

  // Reset when text changes completely (new content)
  useEffect(() => {
    indexRef.current = 0;
    setDisplayedText("");
  }, [text]);

  return {
    displayedText,
    isTyping,
  };
}
