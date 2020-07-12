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
    {
      displayName: 'Category Managment',
      iconName: 'desktop_windows',
      route: '/admin/Category',
    },
    {
      displayName: 'Sub Category',
      iconName: 'ballot',
      route: '/admin/SubCategory',
    },
    {
      displayName: 'Expedientes',
      iconName: 'description',
      children: [
        {
          displayName: 'Mis Expedientes',
          iconName: 'how_to_reg',
          route: '/misexpedientes'
        },
        {
          displayName: 'Todos',
          iconName: 'waves',
          route: '/todos'
        }
      ]
    },
    {
      displayName: 'Perfiles',
      iconName: 'group',
      children: [
          {
            displayName: 'Búsqueda Perfil',
            iconName: 'search',
            route: '/busquedaperfiles'
          }
        ]
      }
  ];

}





