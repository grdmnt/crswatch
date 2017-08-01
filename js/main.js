$(document).ready(function() {
  var app = new Vue({
    el: '#home',
    data: {
      sections: [],
      totalSections: null,
      token: null,
      isLoading: true,
      query: '',
      count: 15,
    },
    mounted() {
      axios.get("https://onethreezero-oxzmvowxul.now.sh/access")
      .then(response => { 
        this.token = response.data.token 
        axios.get("https://onethreezero-oxzmvowxul.now.sh/courses?token=" + this.token)
        .then(response => {
          this.sections = response.data.sections;
          this.isLoading = false;
        })
      });
    },
    computed: {
      tableFilter: function () {
          var results = this.findBy(this.sections, this.query, 'base_class')
          this.totalSections = results.length;
          return results.slice(0, this.count - 1);
      }
    },
    methods: {
      findBy: function (list, value, column) {
        return list.filter(function (item) {
          var firstIndex = item[column].toLowerCase().indexOf(value.toLowerCase());
          var lastIndex = firstIndex + value.length;
          return firstIndex == 0 || item[firstIndex - 1] == ' ' && item[firstIndex + lastIndex];
        })
      },
      haveMore: function() {
        return !this.isLoading && this.totalSections >= this.count;
      }
    }
  });
});
