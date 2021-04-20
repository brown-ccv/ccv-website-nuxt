import embed from 'vega-embed';
import * as _ from 'lodash';

// TODO: make background transparent by default
const vegaBaseMixin = {
  render(h) {
    return h('div', { attrs: { id: this.fullId } });
  },
  props: {
    id: {
      type: String,
      required: true
    },
    dataset: {
      type: Array,
      required: true
    },
    minWidth: {
      type: Number,
      required: false,
      default: 200
    },
    height: {
      type: Number,
      required: false,
      default: 300
    },
    includeActions: {
      type: Boolean,
      required: false,
      default: true
    },
    specOverride: {
      type: Object,
      required: false,
      default() {
        return {};
      }
    },
    enableDarkmode: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  computed: {
    actionsWidth() {
      return this.includeActions ? 28 : 0;
    },
    spec() {
      return _.merge({}, this.baseSpec, this.specOverride);
    },
    darkmodeConfig() {
      // check for dark mode, if so, make labels/axes and such white
      if (this.enableDarkmode) {
        if (
          window.matchMedia &&
          window.matchMedia('(prefers-color-scheme: dark)').matches
        ) {
          const contrastColor = 'white';
          return {
            axis: {
              domainColor: contrastColor,
              gridColor: contrastColor,
              labelColor: contrastColor,
              tickColor: contrastColor,
              titleColor: contrastColor
            },
            legend: {
              labelColor: contrastColor,
              titleColor: contrastColor
            },
            title: {
              color: contrastColor,
              subtitleColor: contrastColor
            }
          };
        }
      }

      return {};
    }
  },
  watch: {
    spec() {
      this.updatePlot();
    },
    includeActions() {
      this.updatePlot();
    },
    darkmodeConfig() {
      this.updatePlot();
    }
  },
  data() {
    return {
      view: null,
      fullId: null,
      resizeObserver: null,
      parentElement: null
    };
  },
  created() {
    // add random number to id to ensure uniqueness - important for storybook
    this.fullId = this.id + Math.floor(Math.random() * Math.floor(1000));
  },
  mounted() {
    this.$nextTick(() => {
      const el = document.querySelector('#' + this.fullId);
      if (el) {
        this.parentElement = el.parentElement;

        this.updatePlot();

        this.resizeObserver = new ResizeObserver(this.resizePlot);
        this.resizeObserver.observe(this.parentElement);
      }
    });
  },
  beforeDestory() {
    if (this.view) {
      this.view.finalize();
      this.resizeObserver.unobserve(this.parentElement);
    }
  },
  methods: {
    getWidth() {
      return (
        Math.max(this.minWidth, this.parentElement.clientWidth) -
        this.actionsWidth
      );
    },
    updatePlot() {
      if (this.view) {
        this.view.finalize();
      }
      embed('#' + this.fullId, this.spec, {
        actions: this.includeActions,
        theme: 'vox',
        renderer: 'svg',
        config: {
          background: null,
          autosize: 'fit',
          width: this.getWidth(),
          ...this.darkmodeConfig
        },
        logLevel: 3
      })
        .then((res) => {
          this.view = res.view;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    resizePlot() {
      if (this.view) {
        this.view
          .width(this.getWidth())
          .resize()
          .runAsync();
      }
    }
  }
};

export default vegaBaseMixin;
