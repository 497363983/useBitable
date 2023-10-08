import { useBitableUrl, useSelection } from "@qww0302/use-bitable"

const {
  recordId,
  fieldId,
  viewId,
  tableId,
} = useSelection()

const url = useBitableUrl(tableId, viewId, fieldId, recordId)