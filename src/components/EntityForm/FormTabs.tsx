import { useState, useRef, useEffect } from 'react';

interface FormTabsProps {
  tabs: string[];
  activeTab: number;
  onTabChange: (tabId: number) => void;
}

export function FormTabs({ tabs, activeTab, onTabChange }: FormTabsProps) {
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const activeIndex = tabs.findIndex((_, index) => index === activeTab);
    const activeTabElement = tabsRef.current[activeIndex];

    if (activeTabElement) {
      setIndicatorStyle({
        left: activeTabElement.offsetLeft,
        width: activeTabElement.offsetWidth,
      });
    }
  }, [activeTab, tabs]);

  return (
    <div className="border-border bg-card relative border-b">
      <div className="flex gap-1 px-6">
        {tabs.map((tab, index) => (
          <button
            type="button"
            key={index}
            ref={(el) => {
              tabsRef.current[index] = el;
            }}
            onClick={() => onTabChange(index)}
            className={`relative px-4 py-3 text-sm font-medium transition-colors duration-200 ${
              activeTab === index
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            } `}
          >
            {tab}
          </button>
        ))}
      </div>
      <div
        className="tab-indicator"
        style={{
          left: indicatorStyle.left,
          width: indicatorStyle.width,
        }}
      />
    </div>
  );
}
