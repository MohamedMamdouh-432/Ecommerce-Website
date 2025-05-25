module.exports = class ApiOptions {
    constructor(operation, queryString) {
        this.operation = operation
        this.query = queryString
    }

    filter() {
        const queryObj = { ...this.query }
        const excludedFields = ['page', 'sort', 'limit', 'fields']
        excludedFields.forEach((el) => delete queryObj[el])

        // 1B) Advanced filtering
        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(
            /\b(gte|gt|lte|lt)\b/g,
            (match) => `$${match}`
        )

        this.operation = this.operation.find(JSON.parse(queryStr))

        return this
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

    paginate() {
        const page = this.query.page * 1 || 1
        const limit = this.query.limit * 1 || 10
        const skip = (page - 1) * limit

        this.operation = this.operation.skip(skip).limit(limit)

        return this
    }
}