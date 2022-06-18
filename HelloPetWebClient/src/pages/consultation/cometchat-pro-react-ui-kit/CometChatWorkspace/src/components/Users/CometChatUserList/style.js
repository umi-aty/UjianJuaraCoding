export const contactWrapperStyle = (props, context) => {

    const borderStyle = (props._parent === "") ? {
        border: `1px solid ${context.theme.borderColor.primary}`
    } : {};


    return {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        boxSizing: "border-box",
        ...borderStyle,
        "*": {
            boxSizing: "border-box",
            "::-webkit-scrollbar": {
                width: "8px",
                height: "4px",
            },
            "::-webkit-scrollbar-track": {
                background: "#ffffff00"
            },
            "::-webkit-scrollbar-thumb": {
                background: "#ccc",
                "&:hover": {
                    background: "#aaa"
                }
            }
        }
    }
}

export const contactHeaderStyle = context => {

	return {
		padding: "16px",
		position: "relative",
		display: "flex",
		alignItems: "center",
		borderBottom: `1px solid ${context.theme.borderColor.primary}`,
		height: "70px",
	};
};

export const contactHeaderCloseStyle = (img, context) => {

    const mq = [...context.theme.breakPoints];

    return {
        cursor: "pointer",
        display: "none",
        mask: `url(${img}) left center no-repeat`,
        backgroundColor: `${context.theme.secondaryTextColor}`,
        height: "24px",
        width: "33%",
        [`@media ${mq[1]}, ${mq[2]}, ${mq[3]}, ${mq[4]}`]: {
            display: "block!important"
        }
    }
}

export const contactHeaderTitleStyle = (props) => {

    const alignment = (props.hasOwnProperty("enableCloseMenu") && props.enableCloseMenu.length > 0) ? {
        width: "33%",
        textAlign: "center"
    } : {};

    return {
        margin: "0",
        fontWeight: "700",
        display: "inline-block",
        width: "100%",
        textAlign: "left",
        fontSize: "20px",
        ...alignment,
        "&[dir=rtl]": {
            textAlign: "right",
        }
    }
}

export const contactSearchStyle = () => {
    
    return {
        margin: "16px",
        position: "relative",
        borderRadius: "8px",
		boxShadow: "rgba(20, 20, 20, 0.04) 0 0 0 1px inset",
        backgroundColor: "rgba(20, 20, 20, 0.04)",
        height: "35px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
}

export const contactSearchButtonStyle = (img, context) => {
	return {
		width: "30px",
		height: "100%",
		padding: "8px 0 8px 8px",
		cursor: "default",
		mask: `url(${img}) 10px center no-repeat`,
		backgroundColor: `${context.theme.secondaryTextColor}!important`,
	};
};

export const contactSearchInputStyle = () => {

    return {
        width: "calc(100% - 30px)",
        padding: "8px",
        fontSize: "15px",
        outline: "none",
        border: "none",
        height: "100%",
        backgroundColor: "transparent",
    }
}

export const contactMsgStyle = () => {

    return {
        overflow: "hidden",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: "50%",
    }
}

export const contactMsgTxtStyle = (context) => {

    return {
        margin: "0",
        minHeight: "36px",
        color: `${context.theme.color.secondary}`,
        fontSize: "20px!important",
        fontWeight: "600",
        lineHeight: "30px",
        wordWrap: "break-word",
        padding: "0 16px"
    }
}

export const contactListStyle = () => {
    
    return {
        height: "calc(100% - 125px)",
        overflowY: "auto",
        margin: "0",
        padding: "0"
    }
}

export const contactAlphabetStyle = () => {
    
    return {
        padding: "0 16px",
        margin: "5px 0",
        width: "100%",
        fontSize: "14px"
    }
}