const Popup = ({
    row,
    onChange,
    onApplyChanges,
    onCancelChanges,
    open,
  }) => (
    <Dialog open={open} onClose={onCancelChanges} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Employee Details</DialogTitle>
      <DialogContent>
        <MuiGrid container spacing={3}>
          <MuiGrid item xs={6}>
            <FormGroup>
              <TextField
                margin="normal"
                name="firstName"
                label="First Name"
                value={row.firstName || ''}
                onChange={onChange}
              />
              <TextField
                margin="normal"
                name="prefix"
                label="Title"
                value={row.prefix || ''}
                onChange={onChange}
              />
              <TextField
                margin="normal"
                name="position"
                label="Position"
                value={row.position || ''}
                onChange={onChange}
              />
            </FormGroup>
          </MuiGrid>
          <MuiGrid item xs={6}>
            <FormGroup>
              <TextField
                margin="normal"
                name="lastName"
                label="Last Name"
                value={row.lastName || ''}
                onChange={onChange}
              />
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                  label="Birth Date"
                  margin="normal"
                  value={row.birthDate}
                  onChange={(_, value) => onChange({
                    target: { name: 'birthDate', value },
                  })}
                  format="DD/MM/YYYY"
                />
              </MuiPickersUtilsProvider>
              <TextField
                margin="normal"
                name="phone"
                label="Phone"
                value={row.phone || ''}
                onChange={onChange}
              />
            </FormGroup>
          </MuiGrid>
        </MuiGrid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancelChanges} color="primary">
          Cancel
        </Button>
        <Button onClick={onApplyChanges} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
  
  const PopupEditing = React.memo(({ popupComponent: Popup }) => (
    <Plugin>
      <Template name="popupEditing">
        <TemplateConnector>
          {(
            {
              rows,
              getRowId,
              addedRows,
              editingRowIds,
              createRowChange,
              rowChanges,
            },
            {
              changeRow, changeAddedRow, commitChangedRows, commitAddedRows,
              stopEditRows, cancelAddedRows, cancelChangedRows,
            },
          ) => {
            const isNew = addedRows.length > 0;
            let editedRow;
            let rowId;
            if (isNew) {
              rowId = 0;
              editedRow = addedRows[rowId];
            } else {
              [rowId] = editingRowIds;
              const targetRow = rows.filter(row => getRowId(row) === rowId)[0];
              editedRow = { ...targetRow, ...rowChanges[rowId] };
            }
  
            const processValueChange = ({ target: { name, value } }) => {
              const changeArgs = {
                rowId,
                change: createRowChange(editedRow, value, name),
              };
              if (isNew) {
                changeAddedRow(changeArgs);
              } else {
                changeRow(changeArgs);
              }
            };
            const rowIds = isNew ? [0] : editingRowIds;
            const applyChanges = () => {
              if (isNew) {
                commitAddedRows({ rowIds });
              } else {
                stopEditRows({ rowIds });
                commitChangedRows({ rowIds });
              }
            };
            const cancelChanges = () => {
              if (isNew) {
                cancelAddedRows({ rowIds });
              } else {
                stopEditRows({ rowIds });
                cancelChangedRows({ rowIds });
              }
            };
  
            const open = editingRowIds.length > 0 || isNew;
            return (
              <Popup
                open={open}
                row={editedRow}
                onChange={processValueChange}
                onApplyChanges={applyChanges}
                onCancelChanges={cancelChanges}
              />
            );
          }}
        </TemplateConnector>
      </Template>
      <Template name="root">
        <TemplatePlaceholder />
        <TemplatePlaceholder name="popupEditing" />
      </Template>
    </Plugin>
  ));