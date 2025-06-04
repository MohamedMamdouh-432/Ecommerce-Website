const ApiOptions = require('./api_options');
const ApiError = require('./api_error');

exports.create = (Model) => async (req, res) => {
    const modelName = Model.modelName;
    const doc = await Model.create(req.body);
    res.status(201).send({
        message: `${modelName} created successfully`,
        data: doc
    });
}

exports.fetchAll = (Model) => async (req, res) => {
    const docsCount = await Model.countDocuments();
    const query = new ApiOptions(Model.find(), req.query)
        .search()
        .filter()
        .limitFields()
        .paginate(docsCount)
        .sort();

    const modelName = Model.modelName;
    const docs = await query.operation;
    res.status(200).send({
        message: `${modelName} retrieved successfully`,
        data: {
            page: parseInt(req.query.page) || 1,
            count: docs.length,
            docs,
        }
    });
}

exports.fetchById = (Model) => async (req, res, next) => {
    const modelName = Model.modelName;
    const doc = await Model.findById(req.params.id);
    if (!doc)
        return next(new ApiError(`${modelName} not found`, 404));
    return res.status(200).send({
        message: `${modelName} retrieved successfully`,
        data: doc
    });
}

exports.update = (Model) => async (req, res, next) => {
    const modelName = Model.modelName;
    const updatedDoc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!updatedDoc)
        return next(new ApiError(`${modelName} not found`, 404));
    return res.status(200).send({
        message: `${modelName} updated successfully`,
        data: updatedDoc
    });
}

exports.delete =  (Model) => async (req, res, next) => {
    const modelName = Model.modelName;
    const deletedDoc = await Model.findByIdAndDelete(req.params.id);
    if (!deletedDoc)
        return next(new ApiError(`${modelName} not found`, 404));
    return res.status(200).send({
        message: `${modelName} deleted successfully`,
        data: deletedDoc
    });
}