import { ref, onMounted, onBeforeUnmount } from "vue";

export function useImageTransform() {
  const overviewImage = ref(null);
  let isTransformed = false; // To track if the image has already transformed

  const observeImage = () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            entry.intersectionRatio >= 0.8 &&
            !isTransformed
          ) {
            // Apply transformation once when 80% is visible
            entry.target.style.transform =
              "rotateX(0deg) scale(100%) translateY(0)";
            isTransformed = true; // Lock the transformation
          }
        });
      },
      {
        threshold: [0.8], // Trigger when 80% of the image is visible
      }
    );

    if (overviewImage.value) {
      observer.observe(overviewImage.value);
    }

    const handleScroll = () => {
      if (window.scrollY === 0 && isTransformed) {
        // Reset the image to its initial state when at the very top
        overviewImage.value.style.transform =
          "perspective(400px) rotateX(15deg) scale(50%) translateY(-300px)";
        isTransformed = false; // Unlock the transformation for next scroll
      }
    };

    window.addEventListener("scroll", handleScroll);

    onBeforeUnmount(() => {
      if (overviewImage.value) {
        observer.unobserve(overviewImage.value);
      }
      window.removeEventListener("scroll", handleScroll);
    });
  };

  onMounted(() => {
    observeImage();
  });

  return { overviewImage };
}
