AutoForm.getFormIdOFElement = function getFormIdOFElement(element) {
  return $(element).closest('form').attr('id');
};

AutoForm.getAllFieldsInElement = function getAllFieldsInElement(element) {
  return $(element).find("[data-schema-key]").not("[disabled]");
}

AutoForm.getFlatDocOfFieldValues = function getFlatDocOfFieldValues(fields, ss) {
  var doc = {};
  fields.each(function () {
    var fieldName, val = AutoForm.getInputValue(this, ss);
    if (val !== void 0) {
      fieldName = $(this).attr("data-schema-key");
      doc[fieldName] = val;
    }
  });
  return doc;
};

AutoForm.getElementValues = function autoFormGetElementValues(element, ss) {
  var formId, formData;

  formId = AutoForm.getFormIdOFElement(element);
  ss = ss || AutoForm.getFormSchema(formId);
  formData = AutoForm.getCurrentDataForForm(formId);

  var keepEmptyStrings = false;
  if (form.removeEmptyStrings === false) {
    keepEmptyStrings = true;
  }
  // By default, we do filter
  var filter = true;
  if (form.filter === false) {
    filter = false;
  }
  // By default, we do autoConvert
  var autoConvert = true;
  if (form.autoConvert === false) {
    autoConvert = false;
  }
  // By default, we do trimStrings
  var trimStrings = true;
  if (form.trimStrings === false) {
    trimStrings = false;
  }

  var doc = AutoForm.getFlatDocOfFieldValues(AutoForm.getAllFieldsInElement(element), ss);
  doc = AutoForm.Utility.expandObj(doc);
  AutoForm.Utility.bubbleEmpty(doc, keepEmptyStrings);

  var insertDoc = AutoForm.Utility.cleanNulls(doc, false, keepEmptyStrings);
  AutoForm.Utility.compactArrays(insertDoc);
  ss.clean(insertDoc, {
    isModifier: false,
    getAutoValues: false,
    filter: filter,
    autoConvert: autoConvert,
    trimStrings: trimStrings
  });

  return insertDoc;
};
