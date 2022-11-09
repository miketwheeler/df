class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    // advanced filter
    filter() {
        const queryObj = { ...this.queryString }; // destructures, copies and creates new object
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach((exField) => delete queryObj[exField])
        
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
        console.log(JSON.parse(queryStr))

        this.query = this.query.find(JSON.parse(queryStr)) //final query - cant await due to chaining in future (sorting, etc.)

        return this;
    }
    // sorting
    sort() {
        if(this.queryString.sort) {
            let sortBy = this.queryString.sort.split(',').join(' '); // other params for the sort
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt _id'); // default sorting order *(none specified) in descending order
        }

        return this;
    }

    // field query limiting
    limitFields() {
        if(this.queryString.fields) {
            let fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select('-__v ')
        }

        return this
    }

    // pagination & results limiting
    paginate() {
        let reqPageNum = this.queryString.page *1 || 1; // *1 to change str to int || default value
        let reqLimitResults = this.queryString.limit *1 || 100;
        let skip = (reqPageNum - 1) * reqLimitResults;

        this.query = this.query.skip(skip).limit(reqLimitResults);

        return this
    }
}

module.exports =  APIFeatures;