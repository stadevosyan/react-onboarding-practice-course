import React from 'react';
import { ButtonGroup, Button, Icon } from '@servicetitan/design-system';
import { Confirm } from '@servicetitan/confirm';
import { getActionCell, GridCellProps, EditActionProps } from '@servicetitan/grid';
import { GridDataItem } from '../stores/users.store';

const EditAction: React.FC<EditActionProps<GridDataItem>> = ({ gridState, dataItem }) => {
    if (!gridState) {
        return <td />;
    }

    const saveHandler = () => {
        gridState.saveEdit(dataItem);
    };

    const cancelHandler = () => gridState.cancelEdit(dataItem);

    return (
        <ButtonGroup attached className="action-buttons-group">
            <Button xsmall text primary onClick={saveHandler}>
                <Icon name="check" size="16px" />
            </Button>
            <Button xsmall text primary onClick={cancelHandler}>
                <Icon name="close" size="16px" />
            </Button>
        </ButtonGroup>
    );
};

const ViewAction: React.FC<GridCellProps<GridDataItem>> = ({ gridState, dataItem }) => {
    if (!gridState) {
        return <td />;
    }

    const editHandler = () => gridState!.edit(dataItem);
    const deleteHandler = () => gridState?.removeFromDataSource(dataItem.id);

    return (
        <ButtonGroup className="action-buttons-group">
            <>
                <Button text primary onClick={editHandler}>
                    Edit
                </Button>
                <Confirm
                    onConfirm={deleteHandler}
                    title="Delete Time Frame"
                    message={`Are u sure u want to remove the user?`}
                >
                    {onClick => (
                        <Button text negative onClick={onClick}>
                            Delete
                        </Button>
                    )}
                </Confirm>
            </>
        </ButtonGroup>
    );
};

export const ActionCell = getActionCell({
    view: ViewAction,
    edit: EditAction
});
