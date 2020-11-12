import Row from "./Row";
const styles = {
    pagesNumber: {
        listStyle: "none",
        display: "flex",
        color: "blue",
        userSelect: "none",
        cursor: "pointer",
    }
};
export default function Table({ events}) {

    return (
        <>
            <table>
                {/*{renderHeader()}*/}
                <tbody>
                {console.log({events})}
                {events.map(event => (
                    <Row key={event.id} event={event}/>
                ))}

                </tbody>
            </table>
            <ul style={styles.pagesNumber}>
                {/*{renderPageNumbers}*/}
            </ul>
        </>
    );
}
