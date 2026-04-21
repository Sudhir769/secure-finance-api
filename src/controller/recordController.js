import recordService from "../services/recordService.js";

const createRecord = async (req, res) => {
  try {
    const { amount, type, category, transaction_date, notes } = req.body;

    const userId = req.user.id;

    const newRecord = await recordService.createRecord( userId, amount, type, category, transaction_date, notes);
    res.status(201).json({ 
            success: true, 
            message: 'Financial record added successfully', 
            record: newRecord 
        });
    }catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error creating record', 
            error: error.message 
        });
    }
};

const getRecords = async (req, res) => {
  try {
    const userId = req.user.id;
    const { type, category } = req.query;
    const records = await recordService.getRecords(userId, type, category);

    res.status(200).json({
      success: true,
      count: records.length,
      data: records,
    });
    } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error fetching records",
        error: error.message,
      });
    }
};

const getSummary = async (req, res) => {
  try {
    const userId = req.user.id;
    const summary = await recordService.getDashboardSummary(userId);

    res.status(200).json({
      success: true,
      data: summary,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching summary",
      error: error.message,
    });
  }
};

const updateRecord = async (req, res) => {
  try {
    const recordId = req.params.id;
    const { amount, type, category, transaction_date, notes } = req.body;

    const updatedRecord = await recordService.updateRecord(
      recordId,
      amount,
      type,
      category,
      transaction_date,
      notes,
    );

    if (!updatedRecord) {
      return res
        .status(404)
        .json({ success: false, message: "Record not found" });
    }

    res.status(200).json({
      success: true,
      message: "Record updated successfully",
      record: updatedRecord,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error updating record",
        error: error.message,
      });
  }
};


const deleteRecord = async (req, res) => {
  try {
    const recordId = req.params.id;

    const deletedRecord = await recordService.deleteRecord(recordId);

    if (!deletedRecord) {
      return res
        .status(404)
        .json({ success: false, message: "Record not found" });
    }

    res.status(200).json({
      success: true,
      message: "Record deleted successfully",
      record: deletedRecord,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error deleting record",
        error: error.message,
      });
  }
};

const getRecordById = async (req, res) => {
  try {
    const recordId = req.params.id;
    const userId = req.user.id;

    const record = await recordService.getRecordById(recordId, userId);

    if (!record) {
      return res
        .status(404)
        .json({ success: false, message: "Record not found" });
    }

    res.status(200).json({
      success: true,
      data: record,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error fetching record",
        error: error.message,
      });
  }
};

export default { createRecord, getRecords, updateRecord, deleteRecord, getSummary, getRecordById };