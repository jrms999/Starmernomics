import pygame
import sys

pygame.init()
screen = pygame.display.set_mode((800, 600))
clock = pygame.time.Clock()
font = pygame.font.SysFont("Arial", 32)

player_pos = [400, 300]
player_hp = 100
enemies = [{"pos": [200, 150], "hp": 50}, {"pos": [600, 400], "hp": 50}]
bullets = []

def draw_player(pos):
    pygame.draw.rect(screen, (0, 255, 0), (*pos, 30, 30))

def draw_enemy(enemy):
    pygame.draw.rect(screen, (255, 0, 0), (*enemy["pos"], 30, 30))

def draw_bullets(bullets):
    for b in bullets:
        pygame.draw.rect(screen, (255, 255, 0), (*b, 10, 5))

def shoot_bullet(player_pos):
    bullets.append([player_pos[0]+15, player_pos[1]])

def move_enemies():
    for enemy in enemies:
        if enemy["pos"][0] < player_pos[0]:
            enemy["pos"][0] += 1
        elif enemy["pos"][0] > player_pos[0]:
            enemy["pos"][0] -= 1
        if enemy["pos"][1] < player_pos[1]:
            enemy["pos"][1] += 1
        elif enemy["pos"][1] > player_pos[1]:
            enemy["pos"][1] -= 1

def handle_bullet_collision():
    global bullets
    for enemy in enemies:
        for bullet in bullets:
            if pygame.Rect(enemy["pos"][0], enemy["pos"][1], 30, 30).colliderect(
                pygame.Rect(bullet[0], bullet[1], 10, 5)):
                enemy["hp"] -= 25
                bullets.remove(bullet)

def main():
    global player_pos
    running = True
    while running:
        screen.fill((30, 30, 30))
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_SPACE:
                    shoot_bullet(player_pos)

        keys = pygame.key.get_pressed()
        if keys[pygame.K_LEFT]: player_pos[0] -= 5
        if keys[pygame.K_RIGHT]: player_pos[0] += 5
        if keys[pygame.K_UP]: player_pos[1] -= 5
        if keys[pygame.K_DOWN]: player_pos[1] += 5

        move_enemies()
        for b in bullets:
            b[0] += 10
        bullets[:] = [b for b in bullets if b[0] < 800]
        handle_bullet_collision()

        draw_player(player_pos)
        draw_bullets(bullets)
        for enemy in enemies:
            if enemy["hp"] > 0:
                draw_enemy(enemy)

        screen.blit(font.render("HP: {}".format(player_hp), True, (255,255,255)), (10, 10))
        pygame.display.flip()
        clock.tick(60)

    pygame.quit()
    sys.exit()

if __name__ == "__main__":
    main()
