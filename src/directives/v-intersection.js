export default {
  mounted(el, binding) {
    let options = {
      rootMargin: "",
      threshold: 1,
    };

    const callback = (entries) => {
      if (entries[0].isIntersecting) {
         binding.value();
      }
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(el);
  },
  name: 'intersection'
}
