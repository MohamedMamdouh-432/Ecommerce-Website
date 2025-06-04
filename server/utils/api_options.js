const { logger } = require("./logger");

module.exports = class ApiOptions {
    constructor(operation, queryString) {
        this.operation = operation
        this.query = queryString
    }

    filter() {
        const queryObj = { ...this.query };
        const excludedFields = ['page', 'sort', 'limit', 'fields', 'keyword'];
        excludedFields.forEach((el) => delete queryObj[el])

        // 1B) Advanced filtering
        let queryStr = JSON.stringify(queryObj)
            .replace(/"(\w+)\[(\w+)\]":\s*"([^"]+)"/g, '"$1":{"$$$2":"$3"}')
            .replace(/\$\$(\w+)/g, '\$$1');

        this.operation = this.operation.find(JSON.parse(queryStr))

        return this
    }

    search() {
        if (this.query.keyword) {
            let jsonQuery = {};
            jsonQuery.$or = [
                { title: { $regex: this.query.keyword, $options: 'i' } },
                { description: { $regex: this.query.keyword, $options: 'i' } },
            ];
            
            this.operation = this.operation.find(jsonQuery);
        }
        return this;
    }

    sort() {
        this.operation = this.operation.sort('-createdAt')
        if (this.query.sort) {
            const sortBy = this.query.sort.split(',').join(' ')
            this.operation = this.operation.sort(sortBy)
        }

        return this
    }

    limitFields() {
        if (this.query.fields) {
            const fields = this.query.fields.split(',').join(' ')
            this.operation = this.operation.select(fields)
        } else {
            this.operation = this.operation.select('-__v')
        }

        return this
    }

    paginate(docsCount) {
        const page = parseInt(this.query.page) || 1;
        const limit = parseInt(this.query.limit) || 10;
        const skip = (page - 1) * limit;
        const endIndex = page * limit;

        // Pagination result
        const pagination = {};
        pagination.currentPage = page;
        pagination.limit = limit;
        pagination.numberOfPages = Math.ceil(docsCount / limit);

        // prev & next page
        if (endIndex < docsCount) pagination.nextPage = page + 1;
        if (skip > 0) pagination.prevPage = page - 1;
        this.paginationResult = pagination;
        
        this.operation = this.operation.skip(skip).limit(limit);

        return this;
    }

    populate(field) {
        this.operation = this.operation.populate({ path: field, select: '__id name' })
        return this
    }
}