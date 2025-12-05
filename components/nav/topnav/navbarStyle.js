export const styles = {
    navbarContainer: {
        width: '100%',
        backgroundColor: '#e60000',
        color: 'white',
        padding: { xs: '8px 0', md: '0' }
    },

    contentWrapper: {
        maxWidth: '1100px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',  // tách 2 bên
        alignItems: 'center',
        padding: { xs: '0 16px', md: '0 24px' }
    },

    leftContact: {
        display: 'flex',
        alignItems: 'center',
        gap: '24px'
    },

    contactItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
    },

    contactText: {
        fontSize: '14px',
        color: 'white'
    },

    socialIcons: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },

    iconButton: {
        width: '26px',
        height: '26px',
        minWidth: '26px',
        backgroundColor: 'white',
        color: '#e60000',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: '0.2s',
        '&:hover': {
            backgroundColor: '#ffd700',     // vàng nổi bật
            color: '#b80000',               // icon đỏ đậm
            transform: 'scale(1.12)',
            boxShadow: '0 0 6px rgba(0,0,0,0.3)' // nổi bật
        }
    }
};
