import { useEffect } from 'react';

const TouchInteraction = () => {
    useEffect(() => {
        // Only apply to touch devices
        if (!('ontouchstart' in window) && !navigator.maxTouchPoints) return;

        let activeElement = null;

        const handleTouchStart = (e) => {
            // Find the closest clickable/interactive element
            const interactiveEl = e.target.closest('a, button, [role="button"], .group');
            
            if (!interactiveEl) {
                // Tapped outside any interactive element, clear active
                if (activeElement) {
                    activeElement.classList.remove('hover-active');
                    // Dispatch pointerleave so framer motion resets
                    activeElement.dispatchEvent(new PointerEvent('pointerleave', { bubbles: true }));
                    activeElement = null;
                }
                return;
            }

            if (activeElement !== interactiveEl) {
                // First tap on a new interactive element
                if (activeElement) {
                    activeElement.classList.remove('hover-active');
                    activeElement.dispatchEvent(new PointerEvent('pointerleave', { bubbles: true }));
                }
                activeElement = interactiveEl;
                
                // Add hover-active class
                interactiveEl.classList.add('hover-active');
                
                // Trigger pointerenter for framer motion to trigger whileHover
                interactiveEl.dispatchEvent(new PointerEvent('pointerenter', { bubbles: true }));
                
                // Prevent this tap from firing a click by setting a flag
                interactiveEl.dataset.preventClick = "true";
            } else {
                // Second tap on the same element, allow click
                interactiveEl.dataset.preventClick = "false";
            }
        };

        const handleClick = (e) => {
            const interactiveEl = e.target.closest('a, button, [role="button"], .group');
            if (interactiveEl && interactiveEl.dataset.preventClick === "true") {
                e.preventDefault();
                e.stopPropagation();
            }
        };

        const handlePointerOut = (e) => {
            // Prevent Framer Motion and other script from seeing pointerout/leave
            // immediately after a tap on touch devices, so the hover state remains active
            if (activeElement && (activeElement === e.target || activeElement.contains(e.target))) {
                e.stopPropagation();
            }
        };

        const handlePointerLeave = (e) => {
            if (activeElement && (activeElement === e.target || activeElement.contains(e.target))) {
                e.stopPropagation();
            }
        };

        // Add event listeners
        document.addEventListener('touchstart', handleTouchStart, { passive: true });
        // Use capture phase for click to stop propagation early
        document.addEventListener('click', handleClick, true);
        
        // Trap pointer events in capture phase so React/Framer Motion don't reset the hover state
        document.addEventListener('pointerout', handlePointerOut, true);
        document.addEventListener('pointerleave', handlePointerLeave, true);

        // Additionally inject a style to handle standard CSS hover vs hover-active globally
        // This ensures Tailwind hover classes also respect .hover-active via CSS cascading
        const style = document.createElement('style');
        style.innerHTML = `
            @media (hover: none) {
                /* For Tailwind, we ideally want hover-active to mimic hover. Since Tailwind uses pseudo-classes,
                   we'll rely on Framer Motion's whileHover mostly. But we can also add global CSS variables if needed. */
                .hover-active {
                    /* Any global fallback styles for hover can go here */
                    cursor: pointer;
                }
            }
        `;
        document.head.appendChild(style);

        return () => {
            document.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('click', handleClick, true);
            document.removeEventListener('pointerout', handlePointerOut, true);
            document.removeEventListener('pointerleave', handlePointerLeave, true);
            document.head.removeChild(style);
        };
    }, []);

    return null;
};

export default TouchInteraction;
