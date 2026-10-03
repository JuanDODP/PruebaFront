import { Box, IconButton, Link, Stack, Tooltip, Typography } from '@mui/material'
import ArrowOutwardRounded from '@mui/icons-material/ArrowOutwardRounded'
import { AUTHOR, CONTACT_LINKS, PORTFOLIO_URL } from '@/config'
import { DURATION, EASE_OUT, REDUCED_MOTION } from '@/theme'

const CURRENT_YEAR = new Date().getFullYear()

const transition = `transform ${DURATION.fast}ms ${EASE_OUT}, background-color ${DURATION.fast}ms ${EASE_OUT}, border-color ${DURATION.fast}ms ${EASE_OUT}, color ${DURATION.fast}ms ${EASE_OUT}`

// Pie de página con los datos de contacto del autor; se muestra en todas las pantallas
export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        color: 'rgba(255, 255, 255, 0.72)',
        background: 'linear-gradient(180deg, #10233A 0%, #0B1828 100%)',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
      }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={{ xs: 3, md: 4 }}
        sx={{
          width: '100%',
          maxWidth: 1280,
          mx: 'auto',
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 4, md: 3.5 },
          alignItems: 'center',
          justifyContent: 'space-between',
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        <Box>
          <Typography sx={{ color: 'common.white', fontWeight: 600 }}>{AUTHOR.name}</Typography>
          <Typography variant="body2" sx={{ mt: 0.25 }}>
            {AUTHOR.role}
          </Typography>
          <Link
            href={PORTFOLIO_URL}
            target="_blank"
            rel="noopener noreferrer"
            underline="none"
            sx={{
              mt: 1,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.5,
              fontSize: 14,
              fontWeight: 600,
              color: 'secondary.light',
              transition,
              '&:hover': { color: 'common.white' },
              '&:hover svg': { transform: 'translate(2px, -2px)' },
              '& svg': { transition },
            }}
          >
            Ver mi portafolio <ArrowOutwardRounded sx={{ fontSize: 16 }} />
          </Link>
        </Box>

        <Stack direction="row" spacing={1.25} component="nav" aria-label="Contacto">
          {CONTACT_LINKS.map(({ id, label, detail, href, icon: Icon }) => {
            const isExternal = href.startsWith('http')
            return (
              <Tooltip key={id} title={detail}>
                <IconButton
                  component="a"
                  href={href}
                  aria-label={`${label}: ${detail}`}
                  {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: 1.5,
                    color: 'rgba(255, 255, 255, 0.65)',
                    bgcolor: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    transition,
                    '&:hover': {
                      color: 'common.white',
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      borderColor: 'rgba(255, 255, 255, 0.24)',
                      transform: 'translateY(-2px)',
                    },
                    '&:focus-visible': { outline: '2px solid', outlineColor: 'secondary.light', outlineOffset: 2 },
                    [REDUCED_MOTION]: { '&:hover': { transform: 'none' } },
                  }}
                >
                  <Icon sx={{ fontSize: 20 }} />
                </IconButton>
              </Tooltip>
            )
          })}
        </Stack>
      </Stack>

      <Typography
        variant="caption"
        component="p"
        sx={{
          textAlign: 'center',
          py: 1.75,
          color: 'rgba(255, 255, 255, 0.45)',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        © {CURRENT_YEAR} {AUTHOR.name} · Prueba técnica Frontend
      </Typography>
    </Box>
  )
}
