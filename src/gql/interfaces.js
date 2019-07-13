const interfaces = {
  Pagination: {
    __resolveType() {
      return 'PagedActivities';
    }
  }
};

module.exports = interfaces;
