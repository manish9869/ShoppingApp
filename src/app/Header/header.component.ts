import { Component, OnInit } from "@angular/core";
import { NavItem } from "./nav-item";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(public authService: AuthService) {}
  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    console.log("isLoggedIn=" + this.isLoggedIn);
  }

  menu: NavItem[] = [
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
      displayName: "Master Menu",
      iconName: "description",
      children: [
        {
          displayName: "Category Managment",
          iconName: "how_to_reg",
          route: "/admin/Category",
        },
        {
          displayName: "Sub Category",
          iconName: "waves",
          route: "/admin/SubCategory",
        },
        {
          displayName: "Products",
          iconName: "waves",
          route: "/admin/Product",
        },
      ],
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

  logout() {
    this.authService.logout();
  }
}
