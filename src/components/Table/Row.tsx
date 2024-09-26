
const Row : React.FC<{
    children: React.ReactNode
    onClick?: () => any
}> = ({ children, onClick }) => {
    return(
        <tr onClick={() => onClick ? onClick() : null}>
            {children}
        </tr>
    )
}

export default Row;