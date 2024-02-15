import HeaderColumn from './HeaderColumn';

export default function Header(props) {

    const { fields = [] } = props;
    return (
        <>
        {fields.map((field, index) => (
                !field?.options.hideFromGrid && < HeaderColumn
                    key={`column-${index}`}
                    field={field}
                />
            ))}
        </>
    )
}