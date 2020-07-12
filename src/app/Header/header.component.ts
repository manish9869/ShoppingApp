import { Component, OnInit } from '@angular/core';
import { NavItem } from './nav-item';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  ngOnInit() {

  }



  menu: NavItem [] = [
    // {
    //   displayName: 'Category Managment',
    //   iconName: 'desktop_windows',
    //   route: '/admin/Category',
    // },
    // {
    //   displayName: 'Sub Category',
    //   iconName: 'ballot',
    //   route: '/admin/SubCategory',
    // },
    {
      displayName: 'Master Menu',
      iconName: 'description',
      children: [
        {
          displayName: 'Category Managment',
          iconName: 'how_to_reg',
          route: '/admin/Category'
        },
        {
          displayName: 'Sub Category',
          iconName: 'waves',
          route: '/admin/SubCategory'
        }
      ]
    },
    // {
    //   displayName: 'Perfiles',
    //   iconName: 'group',
    //   children: [
    //       {
    //         displayName: 'Búsqueda Perfil',
    //         iconName: 'search',
    //         route: '/busquedaperfiles'
    //       }
    //     ]
    //   }
  ];

}





