export default [
    {
        _name: 'CSidebarNav',
        _children: [
            {
                _name: 'CSidebarNavItem',
                name: 'Dashboard',
                to: '/admin/dashboard',
                icon: 'cil-home',
            },
            {
                _name: 'CSidebarNavDropdown',
                name: 'Product',
                route: '/admin/product',
                icon: 'cil-cart',
                items: [
                    {
                        name: 'Product List',
                        to: '/admin/product/product-list'
                    },
                    {
                        name: 'Brand',
                        to: '/admin/product/brand'
                    },
                    {
                        name: 'Category',
                        to: '/admin/product/category'
                    },
                    {
                        name: 'Sub Category',
                        to: '/admin/product/sub-category'
                    },
                    {
                        name: 'Sub Subcategory',
                        to: '/admin/product/sub-subcategory'
                    },
                ]
            },
            {
                _name: 'CSidebarNavDropdown',
                name: 'Shipping',
                route: '/admin/shipping',
                icon: 'cil-truck',
                items: [
                    {
                        name: 'Shipping Configuration',
                        to: '/admin/shipping/configuration'
                    },
                    {
                        name: 'Region',
                        to: '/admin/shipping/region'
                    },
                    {
                        name: 'City',
                        to: '/admin/shipping/city'
                    },
                    {
                        name: 'Area',
                        to: '/admin/shipping/area'
                    },
                ]
            },
            {
                _name: 'CSidebarNavDropdown',
                name: 'Setup & Configurations',
                route: '/admin/setup',
                icon: 'cil-screen-desktop',
                items: [
                    {
                        name: 'General Settings',
                        to: '/admin/setup/general-setting'
                    },
                    {
                        name: 'Pages',
                        to: '/admin/setup/pages'
                    },
                ]
            }
        ]
    }
]
