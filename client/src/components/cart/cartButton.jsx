 

const CartButton = ({onClick, className, text, isSubmit}) => {
     

    if(isSubmit === false) {
        return <button onClick={onClick} className={className} > {text} </button>
    }else {
        return (
            <button disabled={false} onClick={onClick} className={className} > 
                <div className='spinner-border spinner-border-sm me-1' role='status'></div>
                Processing...
            </button>
        )
     }
};

export default CartButton;