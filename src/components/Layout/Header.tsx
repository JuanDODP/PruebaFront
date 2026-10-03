import { useState } from 'react'
import { NavLink } from 'react-router'
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material'
import CloseRounded from '@mui/icons-material/CloseRounded'
import LogoutRounded from '@mui/icons-material/LogoutRounded'
import MenuRounded from '@mui/icons-material/MenuRounded'
import { navRoutes } from '@/config'
import { useAuth } from '@/contexts'

const Brand = () => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
    <Box
      sx={{
        width: 36,
        height: 36,
        borderRadius: 1.5,
        display: 'grid',
        placeItems: 'center',
        bgcolor: 'secondary.main',
        color: 'secondary.contrastText',
        fontWeight: 700,
        fontSize: 14,
      }}
    >
      PT
    </Box>
    <Typography variant="h6" component="span" sx={{ fontSize: { xs: '1rem', sm: '1.125rem' }, letterSpacing: 0.2 }}>
      Prueba Técnica
    </Typography>
  </Box>
)

export const Header = () => {
  const { logout } = useAuth()
  const [open, setOpen] = useState(false)

  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'primary.main', borderBottom: 1, borderColor: 'primary.dark' }}>
      <Toolbar sx={{ width: '100%', maxWidth: 1280, mx: 'auto', px: { xs: 2, sm: 3, md: 4 }, gap: 2 }}>
        <Brand />

        {/* Navegación de escritorio */}
        <Box component="nav" sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5, ml: 4, flex: 1 }}>
          {navRoutes.map(({ id, name, path, icon: Icon }) => (
            <Button
              key={id}
              component={NavLink}
              to={path}
              startIcon={Icon && <Icon />}
              sx={{
                color: 'rgba(255,255,255,0.75)',
                px: 2,
                '&:hover': { color: 'common.white', bgcolor: 'rgba(255,255,255,0.08)' },
                '&.active': { color: 'common.white', bgcolor: 'rgba(255,255,255,0.14)' },
              }}
            >
              {name}
            </Button>
          ))}
        </Box>

        <Button
          onClick={logout}
          startIcon={<LogoutRounded />}
          variant="outlined"
          sx={{
            display: { xs: 'none', md: 'inline-flex' },
            color: 'common.white',
            borderColor: 'rgba(255,255,255,0.4)',
            '&:hover': { borderColor: 'common.white', bgcolor: 'rgba(255,255,255,0.08)' },
          }}
        >
          Cerrar sesión
        </Button>

        {/* Menú móvil / tablet */}
        <IconButton
          onClick={() => setOpen(true)}
          aria-label="Abrir menú"
          sx={{ display: { xs: 'inline-flex', md: 'none' }, ml: 'auto', color: 'common.white' }}
        >
          <MenuRounded />
        </IconButton>
      </Toolbar>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{ paper: { sx: { width: { xs: '80%', sm: 320 }, maxWidth: 360 } } }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 1.5 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Menú
          </Typography>
          <IconButton onClick={() => setOpen(false)} aria-label="Cerrar menú">
            <CloseRounded />
          </IconButton>
        </Box>
        <Divider />
        <List component="nav" sx={{ px: 1, flex: 1 }}>
          {navRoutes.map(({ id, name, path, icon: Icon }) => (
            <ListItemButton
              key={id}
              component={NavLink}
              to={path}
              onClick={() => setOpen(false)}
              sx={{
                borderRadius: 1,
                mb: 0.5,
                '&.active': { bgcolor: 'primary.main', color: 'primary.contrastText' },
                '&.active .MuiListItemIcon-root': { color: 'primary.contrastText' },
              }}
            >
              {Icon && (
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <Icon />
                </ListItemIcon>
              )}
              <ListItemText primary={name} />
            </ListItemButton>
          ))}
        </List>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Button fullWidth variant="outlined" color="error" startIcon={<LogoutRounded />} onClick={logout}>
            Cerrar sesión
          </Button>
        </Box>
      </Drawer>
    </AppBar>
  )
}
