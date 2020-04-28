export const ACTION_TYPES = {
  TOGGLE_SIDEBAR_MINIFY: 'sidebar/TOGGLE_SIDEBAR_MINIFY',
  TOGGLE_SIDEBAR_MOVILE_OPEN: 'sidebar/TOGGLE_SIDEBAR_MOVILE_OPEN'
};

const initialState = {
  pageSidebarMovilOpen: false,
  pageSidebarMinified: false,
  pageSidebarTransparent: false
};

export type SidebarState = Readonly<typeof initialState>;

// Reducer

export default (state: SidebarState = initialState, action): SidebarState => {
  switch (action.type) {
    case ACTION_TYPES.TOGGLE_SIDEBAR_MINIFY:
      return {
        ...initialState,
        pageSidebarMinified: action.payload.minify
      };
    case ACTION_TYPES.TOGGLE_SIDEBAR_MOVILE_OPEN:
      return {
        ...initialState,
        pageSidebarMovilOpen: action.payload.minify
      };
    default:
      return state;
  }
};

export const toggleSidebarMinify = minify => dispatch => {
  dispatch({
    type: ACTION_TYPES.TOGGLE_SIDEBAR_MINIFY,
    payload: { minify }
  });
};

export const toggleMobileSidebar = minify => dispatch => {
  dispatch({
    type: ACTION_TYPES.TOGGLE_SIDEBAR_MINIFY,
    payload: { minify }
  });
};

export const toggleSidebarMobileOpen = minify => dispatch => {
  dispatch({
    type: ACTION_TYPES.TOGGLE_SIDEBAR_MOVILE_OPEN,
    payload: { minify }
  });
};
