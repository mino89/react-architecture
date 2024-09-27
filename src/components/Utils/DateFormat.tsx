export const DateFormat: React.FC<{ date: string }> = ({ date }) => {
    return( 
        <>{new Date(date).toLocaleDateString()}</>
    );
};